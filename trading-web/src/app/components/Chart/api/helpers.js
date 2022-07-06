// Make requests to CryptoCompare API
export async function makeApiRequest(path) {
  const baseURL = process.env.REACT_APP_BASE_API_URL;
  try {
    const response = await fetch(`${baseURL}/api-svc${path}`);
    return response.json();
  } catch (error) {
    // throw new Error(`CryptoCompare request error: ${error.status}`);
    console.log('Server request error:', error);
  }
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
}

export function parseFullSymbol(fullSymbol) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }

  return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}
