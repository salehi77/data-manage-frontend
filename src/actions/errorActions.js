import { toast } from 'react-toastify';


export const errorControlDispatch = error => (dispatch, getState) => { };

export const errorControl = error => {

  console.log('errorActions', { ...error });

  if (error.response === undefined) {
    toast.error('اتصال خود را بررسی کنید');
    throw error;
  }

  switch (error.response.status) {
    case 400:
      toast.error('درخواست بد ارسال شده است');
      break;
    case 401:
      if (error.response.data.code === 'token_not_valid') {
        return new Error('token_not_valid')
      }
      toast.error('کاربری با این مشخصات یافت نشد');
      break;
    case 404:
      toast.error('درخواست موردنظر در سرور پیدا نشد');
      break;
    case 500:
      toast.error('در ارتباط با سرور مشکلی به وجود آمده است');
      break;
    default:
      toast.error('خطا');
  }

  throw error
};
