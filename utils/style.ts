/**
 * Define style classes for company layers globally
 * @param layer - string to manipulate
 */

export function getLayerClass(layer: string) {
  if (!layer) return layer;
  //theLayer = str.replace(/\s/g, '').toLowerCase();

  let layerClass = '';
  if (layer === 'Layer 0') {
    layerClass = 'bg-primary-100 text-primary-500';
  } else if (layer === 'Layer 1') {
    layerClass = 'bg-cyan-100 text-cyan-500';
  } else if (layer === 'Layer 2') {
    layerClass = 'bg-pink-100 text-pink-500';
  } else if (layer === 'Layer 3') {
    layerClass = 'bg-blue-100 text-blue-700';
  } else if (layer === 'Layer 4') {
    layerClass = 'bg-emerald-100 text-emerald-500';
  } else if (layer === 'Layer 5') {
    layerClass = 'bg-yellow-100 text-yellow-700';
  } else {
    layerClass = 'bg-neutral-900 text-gray-500';
  }
  return layerClass;
}
