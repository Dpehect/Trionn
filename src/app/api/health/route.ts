export function GET() {
  return Response.json({ status: "ok", product: "trionn", renderer: "dom-svg", threeJs: false });
}
