import { parsePhoneNumber } from 'libphonenumber-js'
import { v4 } from 'uuid'

export type formType = 'email' | 'length' | 'phoneNumber'

export class ValidateForm {
    public validCSSClass:string = 'is-valid'
    public invalidCSSClass:string = 'is-invalid'

    constructor () {

    }

    protected check (type: formType, value: string, params: string | null = null): { message: string; status: boolean } {
      switch (type) {
        case 'phoneNumber':
          if (value.length < 8) {
            return { status: false, message: 'Please enter a valid phone number' }
          }
          const phone = parsePhoneNumber(value, 'GB')
          return { status: phone.isValid(), message: 'Phone Number is Valid' }
        case 'email':
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const test = re.test(String(value).toLowerCase())

          if (test) {
            return { status: true, message: 'Valid Email' }
          } else {
            return { status: false, message: 'Invalid email address' }
          }
        case 'length':
          if (value.length < Number(params)) {
            return { status: false, message: 'Please enter a value longer than ' + params + ' characters' }
          }
          return { status: true, message: 'Number of Characters are correct' }
        default:
          return { status: false, message: 'General Error' }
      }
    }

    /**
   *
   * @param form HTMLInputElement // this is the form itself that you can send over to check
   * Make sure you have use the data- attributes accordingly
   */
    parse (form: HTMLInputElement): object {
      if (form === null) {
        return { status: false, message: 'Error no Form' }
      }
      this.deleteCurrentFeedback(form)
      const dataType: formType = <formType> form.dataset.validate
      const dataValue = (form.dataset.value) ? form.dataset.value : null
      const value = form.value
      if (!dataType) {
        return { status: false, message: 'General Error' }
      }
      const check: { status: boolean, message: string } = this.check(dataType, value, dataValue)
      if (check.status) {
        this.makeValid(form)
      } else {
        this.addMessage(form, check.message, check.status)
        this.makeInvalid(form)
      }
      return check
    }

    protected deleteCurrentFeedback (form: HTMLInputElement) {
    // delete the current one
      if (form.parentNode) {
      // @ts-ignore
        form.parentNode.childNodes.forEach((item: HTMLInputElement) => {
          if (item.classList.length > 0) {
            if (item.classList.contains('feedback')) {
              item.remove()
            }
          }
        })
      }
    }

    addMessage (form: HTMLInputElement, messageValue: string = 'Error', valid: boolean = true) {
      if (form) {
        const messageElement = document.createElement('div')
        const subMessageElement = document.createElement('div')
        subMessageElement.textContent = String(messageValue)
        subMessageElement.classList.add((valid) ? 'valid-feedback' : 'invalid-feedback')
        subMessageElement.style.display = 'block'
        messageElement.classList.add('feedback')
        messageElement.append(subMessageElement)
        const uuid = v4()

        messageElement.id = uuid
        form.parentElement.append(messageElement)
        this.registerFeedbackElement(form, uuid)
      }
    }

  protected listOfFeedbackElement: Array<string> = []

  registerFeedbackElement (form: HTMLInputElement, elem: string) {
    const num = this.listOfFeedbackElement.push(elem)
    setTimeout(() => {
      const element = document.getElementById(elem)
      if (element) {
        this.listOfFeedbackElement.splice(num - 1, 1)
        element.remove()
        this.removePrevious(form)
      }
    }, 15000)
  }

  private removePrevious (form: HTMLInputElement) {
    form.classList.remove(this.invalidCSSClass)
    form.classList.remove(this.validCSSClass)
  }

  makeInvalid (form: HTMLInputElement) {
    this.removePrevious(form)
    form.classList.add(this.invalidCSSClass)
  }

  makeValid (form: HTMLInputElement) {
    this.removePrevious(form)
    form.classList.add(this.validCSSClass)
  }
}
