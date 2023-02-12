type AlertProps = {
  message: string;
  alertType: string;
};

const alertType = 'danger';
const Alert = ({ message, alertType }: AlertProps) => {
  if (alertType === 'success') {
    return (
      <div className='text green-700 bg-green-300  border-green-700 alert'>
        {message}
      </div>
    );
  }
  if (alertType === 'danger') {
    return (
      <div className='text red-700 bg-red-300 border-red-700 alert'>
        {message}
      </div>
    );
  }
  return null;
};

export default Alert;
