export const handleAlertSuccess = (
  setAlertType,
  setMessage,
  setShowAlert,
  message
) => {
  setAlertType('success');
  setMessage(message);
  setShowAlert(true);
  setTimeout(() => clearAlert(setAlertType, setMessage, setShowAlert), 3000);
};

export const handleAlertDanger = (
  setAlertType,
  setMessage,
  setShowAlert,
  message
) => {
  setAlertType('danger');
  setMessage(message);
  setShowAlert(true);
  setTimeout(() => clearAlert(setAlertType, setMessage, setShowAlert), 3000);
};

const clearAlert = (setAlertType, setMessage, setShowAlert) => {
  setAlertType('');
  setMessage('');
  setShowAlert(false);
};
