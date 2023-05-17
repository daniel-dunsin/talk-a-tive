import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const loadingRes = (text: string) => {
  toast.info(text, {
    autoClose: 2000,
    hideProgressBar: false,
  });
};

export const successRes = (text: string) => {
  toast.success(text);
};

export const errorRes = (error: AxiosError<{ err: string }> | string) => {
  toast.error(typeof error === 'string' ? error : error.response?.data?.err);
};
