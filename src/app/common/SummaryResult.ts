import { Analytic } from "./Analytic";

export class SummaryResult
{ 
    short_url!: string;
    long_url!: string;
    analytics!: Array<Analytic>
}