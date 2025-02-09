console.log('NODE_ENV:', process.env["NODE_ENV"]);
const environment = process.env["NODE_ENV"] || 'development'; // Default to development if NODE_ENV is not set
const config = {
    applicationUri: require('./env.json')[environment].applicationUri
};

console.log('Current Environment:', environment);
console.log('Configuration:', config);

export default config;

export const ShortenUrl = config.applicationUri + "/shorten";

export function CreateShortenedUrl(shortenedUrl:string):string{
    return `${config.applicationUri}/${shortenedUrl}`;
}

export function GetSummaryUrl(shortenedUrl:string):string{
    return `${config.applicationUri}/${shortenedUrl}/summary`;
}