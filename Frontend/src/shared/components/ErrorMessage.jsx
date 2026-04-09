import './ErrorMessage.css';

const ErrorMessage = ({ title = '', message = 'Försök igen senare.' }) => {
  return (
    <div className="error-message">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
