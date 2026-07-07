import { tokenizeFinancials, mockLLMEvaluation, UserProfile, FinancialState, LifeEvent } from "./tokenization";

export class LocalReasoningEngine {
  private profile: UserProfile;
  private state: FinancialState;
  
  constructor(profile: UserProfile, initialState: FinancialState) {
    this.profile = profile;
    this.state = initialState;
  }

  public getState() {
    return {
      profile: this.profile,
      financials: this.state
    };
  }

  // Evaluate the twin against a new event
  public async evaluateEvent(event: LifeEvent): Promise<{
    newState: FinancialState,
    recommendations: string[],
    llmReasoning: string
  }> {
    
    // 1. Perform deterministic math locally (no LLM)
    let newNetWorth = this.state.netWorth;
    let newTaxEfficiency = this.state.taxEfficiency;
    let recommendations: string[] = [];
    
    if (event.type === "JOB_CHANGE") {
      newTaxEfficiency -= 2; // Temporary drop during transition
      recommendations.push("Review new employer 401(k) match structure");
    } else if (event.type === "DEPENDENT_ADDED") {
      recommendations.push("Fund 529 Account");
      recommendations.push("Update Revocable Living Trust beneficiaries");
    }

    this.state = {
      ...this.state,
      netWorth: newNetWorth,
      taxEfficiency: newTaxEfficiency
    };

    // 2. Tokenize PII and financials
    const tokenizedNetWorth = tokenizeFinancials(newNetWorth);
    const tokenizedContext = `User State: ${this.profile.stateOfResidence}, Net Worth: ${tokenizedNetWorth}, Event: ${event.type}`;
    
    // 3. Send tokenized prompt to LLM
    const llmReasoning = await mockLLMEvaluation(tokenizedContext);

    return {
      newState: this.state,
      recommendations,
      llmReasoning
    };
  }
}
