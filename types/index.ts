export interface Variable {
  name: string;
  example: string;
  value: string;
}

export interface KeywordVariablesResponse {
  variables: Variable[];
}

export interface GenerateImageResponse {
  imageUrls: string[];
}