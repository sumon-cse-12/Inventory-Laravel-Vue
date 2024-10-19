import {
    Form as VeeForm,
    Field as VeeField,
    defineRule,
    ErrorMessage,
    configure
} from 'vee-validate'

import {
    required,
    min,
    max,
    email,
    alpha_spaces as alphaSpaces,
    min_value as minValue,
    max_value as maxValue,
    confirmed,
    not_one_of as excluded
} from '@vee-validate/rules'

export default {
    install(app) {
        // Register components globally
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        // Define validation rules
        defineRule('required', required);
        defineRule('checkbox', required); // Checkbox validation
        defineRule('email', email);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('min_value', minValue);
        defineRule('max_value', maxValue);
        defineRule('passwords_mismatch', confirmed);
        defineRule('excluded', excluded);

        // Configure custom error messages
        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    min: `The field ${ctx.field} is too short.`,
                    max: `The field ${ctx.field} is too long.`,
                    alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too large.`,
                    email: `The field ${ctx.field} must be a valid email.`,
                    excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
                    passwords_mismatch: `Passwords don't match.`
                };

                return messages[ctx.rule.name]
                    ? messages[ctx.rule.name]
                    : `The field ${ctx.field} is invalid.`;
            }
        });
    }
}
