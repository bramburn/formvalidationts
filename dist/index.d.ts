export declare type formType = 'email' | 'length' | 'phoneNumber';
export declare class ValidateForm {
    validCSSClass: string;
    invalidCSSClass: string;
    constructor();
    protected check(type: formType, value: string, params?: string | null): {
        message: string;
        status: boolean;
    };
    /**
     *
     * @param form HTMLInputElement // this is the form itself that you can send over to check
     * Make sure you have use the data- attributes accordingly
     */
    parse(form: HTMLInputElement): object;
    protected deleteCurrentFeedback(form: HTMLInputElement): void;
    addMessage(form: HTMLInputElement, messageValue?: string, valid?: boolean): void;
    protected listOfFeedbackElement: Array<string>;
    registerFeedbackElement(form: HTMLInputElement, elem: string): void;
    private removePrevious;
    makeInvalid(form: HTMLInputElement): void;
    makeValid(form: HTMLInputElement): void;
}
