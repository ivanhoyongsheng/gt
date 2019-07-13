const response = {
  teacher: 'teacherken@gmail.com',
  students: ['studentjon@gmail.com', 'studenthon@gmail.com']
};
export default response;

export const stripNewLines = (str: string) => {
  return str.replace(/\n/g, ' ');
};

export const errorMessageHandler = (message: string) => {
  return {
    message: `Sorry, an error occured: ${message}`
  };
};

export const successMessageHandler = (message?: string) => {
  return {
    message: `Success!${message ? ` ${message}` : ''}`
  };
};
export const warningMessageHandler = (message: string) => {
  return {
    message: `Warning: ${message}`
  };
};

const validIdString = '(\\w|\\.|\\-)+@[^\\.^\\@]+(\\.\\w+)+\\b';

export const validEmailRegex = new RegExp(validIdString);

export const validMentionEmailRegex = new RegExp(`@${validIdString}`, 'g');
