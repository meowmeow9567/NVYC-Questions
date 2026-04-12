function QuestionCard({ question }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "12px",
      margin: "10px",
      borderRadius: "8px",
      background: "#f9f9f9"
    }}>
      <p>{question.text}</p>
    </div>
  );
}

export default QuestionCard;