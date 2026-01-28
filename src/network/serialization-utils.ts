export const byteToHex = (() => {
  const byteToHex = [];
  for (let n = 0; n <= 0xff; ++n) {
    const hexOctet = n.toString(16).padStart(2, '0');
    byteToHex.push(hexOctet);
  }
  return byteToHex;
})();

export const hexToByte = (() => {
  const hexToByte: {[key: string]: number} = {};
  for (let i = 0; i < 16; ++i) {
    hexToByte[i.toString(16).toLowerCase()] = i;
  }
  return hexToByte;
})();

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  const hexOctets = new Array(byteArray.length);
  for (let i = 0; i < byteArray.length; ++i) {
    hexOctets.push(byteToHex[byteArray[i]]);
  }
  return hexOctets.join('');
}

export function hexToArrayBuffer(hex: string): ArrayBuffer {
  hex = hex.toLowerCase();
  const bytes = new Uint8Array(Math.floor(hex.length / 2));
  let i;
  for (i = 0; i < bytes.length; i++) {
    const a = hexToByte[hex[i * 2]];
    const b = hexToByte[hex[i * 2 + 1]];
    if (a === undefined || b === undefined) {
      break;
    }
    bytes[i] = (a << 4) | b;
  }
  return i === bytes.length ? bytes : bytes.slice(0, i);
}
