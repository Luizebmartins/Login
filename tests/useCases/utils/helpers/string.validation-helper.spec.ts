import { StringValidator } from '@/useCases/utils/helpers/string-validation-helper'

describe('StringValidator', () => {
    test('should return false if no valid email is provided', () => {
        const sut = new StringValidator()
        const email = "email"
    
        const validation = sut.validateEmail(email)
        expect(validation).toBe(false)
    })
    
    test('should return true if no valid email is provided', () => {
        const sut = new StringValidator()
        const email = "email@gmail.com.br"
    
        const validation = sut.validateEmail(email)
        expect(validation).toBe(true)
    })
})