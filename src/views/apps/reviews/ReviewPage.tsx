import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { Table, Modal, Button, Label, TextInput, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CardBox from 'src/components/shared/CardBox';
import { API_BASE_URL } from 'src/config/config';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { SPinner } from 'src/layouts/full/shared/Spinner';
import { formatDateTime } from 'src/service/formatDate';
import { getAdminReviews } from 'src/service/rating';

const ReviewPage = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Reviews' }];
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setError] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | any>(0);

  const ratingsNum = [1, 2, 3, 4, 5];

  const handleRatingClick = (rating: number | null) => {
    setSelectedRating(rating);
    // fetchReviews(rating ? Array.from({ length: rating }, (_, i) => i + 1) : [], currentPage);
  };

  const fetchReviews = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getAdminReviews(selectedRating, page, 10); // Fetch 10 reviews per page
      setReviews(data.result);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage, selectedRating]);

  const handleSaveReview = async () => {
    try {
      if (editMode && currentReviewId) {
        const response = await axios.patch(`${API_BASE_URL}/api/v1/reviews/edit`, {
          id: currentReviewId,
          review_text: reviewText,
          rating: rating,
        });
        setReviews(
          reviews.map((review: any) =>
            review._id === currentReviewId ? response.data.result : review,
          ),
        );
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/v1/reviews/create`, {
          review_text: reviewText,
          rating: rating,
        });
        setReviews([...reviews, response.data.result]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  // const openEditModal = (review: any) => {
  //   setReviewText(review.review_text);
  //   setRating(review.rating);
  //   setCurrentReviewId(review._id);
  //   setEditMode(true);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    setReviewText('');
    setRating('');
    setEditMode(false);
    setCurrentReviewId(null);
  };

  const deleteReview = async (id: any) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/v1/reviews/delete`, { params: { id } });
      fetchReviews(currentPage);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <BreadcrumbComp title="All Reviews" items={BCrumb} />
      <CardBox>
        <div className="flex space-x-2 mb-3">
          {ratingsNum.map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`px-3 py-2 rounded-md border ${
                selectedRating && rating === selectedRating
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              ⭐ {rating}
            </button>
          ))}
          <button
            onClick={() => handleRatingClick(null)}
            className={`px-3 py-2 rounded-md ${
              selectedRating === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            All Ratings
          </button>
        </div>
        <div className="overflow-x-auto border rounded-md">
          {loading ? (
            <div className="h-32">
              <SPinner />
            </div>
          ) : (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Event</Table.HeadCell>
                <Table.HeadCell>Rating</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Statement</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {reviews.map((review: any) => (
                  <Table.Row key={review._id}>
                    <Table.Cell>{review.userId?.full_name}</Table.Cell>
                    <Table.Cell>{review.eventId?.title}</Table.Cell>
                    <Table.Cell>{review.rating}</Table.Cell>
                    <Table.Cell>{formatDateTime(review.updatedAt)}</Table.Cell>
                    <Table.Cell>{review.comment}</Table.Cell>
                    <Table.Cell className="flex gap-2 items-center">
                      <Button
                        color="blue"
                        size="xs"
                        className="bg-gray-600"
                        // onClick={() => openEditModal(review)}
                      >
                        <Icon icon="solar:mailbox-linear" height="18" /> Send Mail
                      </Button>
                      <Button
                        onClick={() => navigate(`/Event/${review.eventId._id}`)}
                        color="blue"
                        size="xs"
                        className="bg-blue-500"
                      >
                        <Icon icon="solar:eye-bold" height="18" /> View Event
                      </Button>
                      <Button
                        color="blue"
                        size="xs"
                        className="bg-red-500"
                        onClick={() => deleteReview(review._id)}
                      >
                        <Icon icon="solar:trash-bin-minimalistic-bold-duotone" height="18" /> Remove
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardBox>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>{editMode ? 'Edit Review' : 'Add Review'}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reviewText" value="Review Text" />
              <TextInput
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="rating" value="Rating" />
              <TextInput
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveReview}>{editMode ? 'Update' : 'Add'}</Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewPage;
