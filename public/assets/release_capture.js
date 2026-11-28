// Follow the release's lead feature and use the App's original screenshot crop.
export function releaseCapture(release) {
  const lead = release.artwork?.featureId
    ? release.changes.find(change => change.id === release.artwork.featureId)
    : release.changes.find(change => change.kind === 'feature');
  return [lead, ...release.changes].map(change => change?.capture).find(capture => {
    if (!capture || !/^[a-z0-9_]+\.png$/.test(capture.file) || !capture.region) return false;
    const { x, y, width, height, sourceWidth, sourceHeight } = capture.region;
    return [x, y, width, height, sourceWidth, sourceHeight].every(Number.isSafeInteger)
      && x >= 0 && y >= 0 && width > 0 && height > 0
      && x + width <= sourceWidth && y + height <= sourceHeight;
  });
}

export const captureFilename = version => `${version.replaceAll(/[.+-]/g, '_')}.webp`;
