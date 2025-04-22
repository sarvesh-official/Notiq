export async function POST() {
  return Response.json({ 
    data: { message: "Please use Google authentication instead" }, 
    error: null 
  });
}
