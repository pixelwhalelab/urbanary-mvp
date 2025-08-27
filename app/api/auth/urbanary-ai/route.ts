import { NextRequest, NextResponse } from "next/server";
import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY!,
});

interface AIVenue {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  coordinates?: string;
  description?: string;
}

interface Venue {
  name: string;
  address: string;
  phone: string;
  website: string;
  coordinates: string;
  description: string;
  map: string;
  image: string;
}

async function getGooglePlaceDetails(
  name: string,
  locationHint: string
): Promise<{
  photo?: string;
  phone?: string;
  website?: string;
  formatted_address?: string;
} | null> {
  try {
    const query = encodeURIComponent(`${name} ${locationHint}`);
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&region=uk&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.results?.length) return null;
    const placeId = searchData.results[0].place_id;

    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,photos,formatted_phone_number,website,formatted_address&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const photoRef = detailsData.result?.photos?.[0]?.photo_reference;
    const photo = photoRef
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${photoRef}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      : undefined;

    return {
      photo,
      phone: detailsData.result?.formatted_phone_number,
      website: detailsData.result?.website,
      formatted_address: detailsData.result?.formatted_address,
    };
  } catch (err) {
    console.error("Google Places API error:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const allowedTopics = [
    // Food-related
    "restaurant",
    "restaurants",
    "dinner",
    "lunch",
    "brunch",
    "breakfast",
    "food",
    "meal",
    "eat",
    "places to eat",
    "buffet",
    "cafe",
    "cafes",
    "chinese",
    "italian",
    "indian",
    "french",
    "mexican",
    "thai",
    "japanese",
    "street food",
    "fine dining",
    "rooftop restaurant",

    // Nightlife and drinks
    "bar",
    "bars",
    "pub",
    "lounges",
    "nightclub",
    "nightclubs",
    "nightlife",
    "club",
    "clubs",
    "drinks",
    "cocktails",
    "alcohol",
    "beer",
    "wine",
    "happy hour",
    "hookah",
    "shisha",
    "dance floor",

    // Activities and outings
    "things to do",
    "activities",
    "activity",
    "go out",
    "hangout",
    "hangouts",
    "fun places",
    "entertainment",
    "places to go",
    "what to do",
    "games",
    "escape room",
    "karaoke",
    "bowling",

    // Social 
    "date night",
    "romantic",
    "celebration",
    "birthday",
    "anniversary",
    "friends night out",
    "solo outing",
    "party",
    "weekend plans",
    "evening plans",
    "cool places",
    "chill",
    "vibe",
    "aesthetic",
    "scenic",
    "fun",
    "relax",
    "night out",
    "night outing",

    // Travel
    "near me",
    "nearby",
    "around me",
    "in town",
    "explore",
    "tourist",
    "local",
    "must visit",
    "best places",
    "top rated",
    "leeds town",
    "leed",
    "leeds",
    "leeds city centre",
    "leeds city",
    "Leeds town LS1",
    "tour",
    "trip",
    "tour plan",
    "travel ideas",
    "city tour",
    "short trip",
    "travel guide",
    "trip plan",
  ];

  const messageLower = message.toLowerCase();
  const mentionsTopic = allowedTopics.some((topic) =>
    messageLower.includes(topic)
  );

  if (!mentionsTopic) {
    return NextResponse.json({
      reply:
        "<p>This AI helps you find bars, restaurants, attractions, and activities based on your preferences.</p>",
      venues: [],
    });
  }

  const blockedPhrases = [
    "near me",
    "around me",
    "close to me",
    "by me",
    "closest to me",
  ];
  if (blockedPhrases.some((phrase) => messageLower.includes(phrase))) {
    return NextResponse.json({
      reply:
        "<p>This AI cannot detect your live location. Please provide a city, town, or UK postcode to get recommendations.</p>",
      venues: [],
    });
  }

  const prompt = `
You are a smart travel and local assistant.

Instructions:
1. Always return venues ONLY from the city, town, or UK postcode the user mentions. 
   - Example: If the user says "London", only use venues in London, United Kingdom.
   - Never suggest places from another country.
   - If unsure about the city, ask for clarification.

2. Begin with a friendly <p> paragraph summarizing the options.

3. Then provide a JSON array of venues with ONLY these keys:
   - name
   - coordinates
   - description

Absolutely do NOT include "address", "phone number", "website", "map", or "image".  
Only return the three fields listed.

4. Be concise, warm, and natural (avoid technical words).

Example:
<p>Here are some popular Indian restaurants in London:</p>
[
  {
    "name": "Dishoom Covent Garden",
    "coordinates": [51.5136, -0.1266],
    "description": "A lively Bombay-style canteen, famous for its black daal and chai."
  },
  {
    "name": "Gymkhana",
    "coordinates": [51.5093, -0.1418],
    "description": "Michelin-starred restaurant with refined Indian cuisine and club-like interiors."
  }
]

User message: "${message}"
Assistant:
`;

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawReply =
      response.message?.content
        ?.filter((item) => item.type === "text")
        .map((item) => item.text)
        .join(" ")
        .trim() ?? "";

    const paragraphMatch = rawReply.match(/<p>.*?<\/p>/s);
    const introParagraph = paragraphMatch ? paragraphMatch[0] : "";

    const jsonMatch = rawReply.match(/\[.*\]/s);
    let venues: Venue[] = [];

    if (jsonMatch) {
      try {
        const aiVenues: AIVenue[] = JSON.parse(jsonMatch[0]);
        if (!aiVenues.length) {
          throw new Error("Something went wrong. Please try again later.");
        }
        venues = await Promise.all(
          aiVenues.map(async (v: AIVenue) => {
            let address = "";
            let phone = "";
            let website = "";

            const googleData = await getGooglePlaceDetails(v.name, message);

            if (googleData) {
              address = googleData.formatted_address || "";
              phone = googleData.phone || "";
              website = googleData.website || "";
            }

            const image = googleData?.photo || "/fallback.jpg";

            return {
              name: v.name || "",
              address,
              phone,
              website,
              coordinates: v.coordinates || "",
              description: v.description || "",
              map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${v.name}, ${address}`
              )}`,
              image,
            };
          })
        );
      } catch (err) {
        console.error("JSON parsing error:", err);
      }
    }

    return NextResponse.json({ reply: introParagraph, venues });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({
      reply: "<p>An unexpected error appeared. Please try again later.</p>",
      venues: [],
    });
  }
}
