export {};

declare global {
  interface CustomJwtSessionClaims {
    public_metadata: {
      onboardingComplete?: boolean;
    };
  }
}
