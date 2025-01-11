import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/data", () => {
    // Replace the following JSON with your own data
    const jsonResponse = { message: "Hello, World!", data: [1, 2, 3] };
    return HttpResponse.json(jsonResponse);
  }),
];
