export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <h4>{review.author}</h4>
        <div className="rating">
          {Array(review.rating).fill('★').join('')}
        </div>
        <small>{new Date(review.date).toLocaleDateString()}</small>
      </div>
      <p className="review-text">"{review.text}"</p>
    </div>
  );
}