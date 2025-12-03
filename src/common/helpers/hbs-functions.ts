export const helpers = {
  dateFormat: (date: string) => {
    const locale = new Date(date);
    return locale.toLocaleString('pt-BR');
  },
  inc: (value: string) => parseInt(value) + 1,

  json: (value: any) => {
    return JSON.stringify(value);
  },


  'selected-option': (id: any, compareId: any, oldId?: any) => {
    if (oldId) return id == oldId ? 'selected' : '';
    return id == compareId ? 'selected' : '';
  },

  year: () => new Date().getFullYear(),

  getValue: (oldValue: any, currentValue: any) => {
    if (oldValue !== undefined && oldValue !== null && oldValue !== '') {
      return oldValue;
    }
    return currentValue ?? '';
  },
  


  'error-message': (errors: any[], key: string) =>
    errors?.find((i) => i.property == key)?.message,

  'error-messages': (errors: any[], key: string) =>
    errors?.find((i) => i.property == key)?.messages,

  
  eq: (a: any, b: any) => a == b,

  
};
