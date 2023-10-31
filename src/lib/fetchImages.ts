import { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) throw new Error("Fetch Images error! \n");

    const imagesResults: ImagesResults = await res.json();

    const parseData = ImagesSchemaWithPhotos.parse(imagesResults);

    if (parseData.total_results === 0) return undefined;

    return parseData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
