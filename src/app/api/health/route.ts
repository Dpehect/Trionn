export function GET() {
  return Response.json({ status: "ok", product: "trionn-boutique", renderer: "dom-svg-webgl", threeJs: false });
}
