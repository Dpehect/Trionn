# Softbridge Blender Asset Production Specification

The production website is built with a procedural R3F fallback so it remains functional before final Blender assets are delivered. Replace the fallback with the following authored GLB files.

## 1. integrated-delivery-system.glb
Two complementary precision-machined volumes that merge around one central knot. Avoid generic spheres.
- Helsinki volume: rounded icosahedral shell, 28–35k triangles at LOD0, 8–10k LOD1, 2.5k LOD2.
- Türkiye volume: faceted dodecahedral volume, matching visual mass.
- Central system: continuous ribbon/knot with clean quad topology and curve-driven deformation shape keys.
- Materials: purple transmission glass, lime satin ceramic, brushed warm aluminium, no baked environment reflections.
- Animation clips: `idle` 8s loop, `merge` 3.2s, `separate` 2.2s, `dataPulse` 2s loop.
- Pivot at world origin; real-world scale approximately 4 metres wide.

## 2. capability-forms.glb
Four forms in one file, separate named scenes or nodes: `Product`, `Experience`, `Intelligence`, `Platform`.
- Product: interlocking structural blocks.
- Experience: one continuous folded surface with tactile edge radius.
- Intelligence: branching core with controlled satellite nodes.
- Platform: load-bearing frame and connected service rails.
- LOD0 maximum 18k triangles each; LOD1 5k; LOD2 1.5k.
- Shape keys must allow clean 1.2–1.8 second morph-like transitions without self-intersection.

## 3. case-study-devices.glb
Modular desktop frame, mobile frame and operational console used for work previews.
- Separate meshes and material slots; no text baked into textures.
- Maximum 25k triangles for the full composition.
- UVs only for subtle roughness variation; UI remains HTML/CSS or render-to-texture.

## Blender authoring rules
- Blender 4.x, metric units, transforms applied, +Y up conversion verified on export.
- Bevel modifier widths remain physically consistent; Weighted Normal where required.
- No unapplied subdivision. No hidden objects. No embedded 4K textures.
- Use Draco or Meshopt after visual verification. KTX2/Basis textures, maximum 1024px except a justified hero normal map.
- Export GLB with animations, custom properties and tangents. Disable cameras and lights in export.
- Test in glTF Validator: zero errors, zero non-manifold geometry, no duplicate vertices.
- Total hero GLB target under 900KB compressed; all capability assets under 1.2MB combined.
