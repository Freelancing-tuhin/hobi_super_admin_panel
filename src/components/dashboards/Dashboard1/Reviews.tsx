import { useState } from 'react';
import CardBox from '../../shared/CardBox';
import { Table, Button } from 'flowbite-react';
import SimpleBar from 'simplebar-react';
import { formatDateTime } from 'src/service/formatDate';

const Reviews = ({ usersList }: any) => {
  const [activeGender] = useState('All');
  const [activeRating, setActiveRating] = useState<number | null>(null);

  const handleRatingClick = (rating: number | null) => {
    setActiveRating(rating);
  };

  const handleSendMail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <CardBox className="pb-3">
      <div className="sm:flex justify-between align-baseline">
        <h5 className="card-title">Ratings & Reviews</h5>
      </div>

      {/* Rating Filters */}
      <div className="overflow-x-auto mt-4 mb-2">
        <SimpleBar>
          <div className="flex gap-4">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
              <div
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={`py-2 px-4 rounded-tw cursor-pointer text-sm font-semibold flex gap-2 items-center
                  ${
                    activeRating === rating
                      ? 'text-white bg-primary hover:bg-primaryemphasis'
                      : 'text-dark dark:text-white bg-muted dark:bg-dark hover:bg-lightprimary'
                  }`}
              >
                ⭐ {rating}
              </div>
            ))}
            <div
              onClick={() => handleRatingClick(null)}
              className={`py-2 px-4 rounded-tw cursor-pointer text-sm font-semibold flex gap-2 items-center
                ${
                  activeRating === null
                    ? 'text-white bg-primary hover:bg-primaryemphasis'
                    : 'text-dark dark:text-white bg-muted dark:bg-dark hover:bg-lightprimary'
                }`}
            >
              All Ratings
            </div>
          </div>
        </SimpleBar>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto -mt-4">
        <Table>
          <Table.Head className="border-b border-bordergray dark:border-darkborder">
            <Table.HeadCell className="py-2 px-3 ps-0 text-ld font-normal">Name</Table.HeadCell>
            <Table.HeadCell className="py-2 px-3 ps-0 text-ld font-normal">Date</Table.HeadCell>
            <Table.HeadCell className="text-ld font-normal">Rating</Table.HeadCell>
            <Table.HeadCell className="text-ld font-normal">Comment</Table.HeadCell>
            <Table.HeadCell className="text-ld font-normal">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-bordergray dark:divide-darkborder">
            {usersList
              ?.filter(
                (user: any) =>
                  (activeGender === 'All' ||
                    user.userId.gender.toUpperCase() === activeGender.toUpperCase()) &&
                  (activeRating === null || user.rating === activeRating),
              )
              .map((user: any, index: number) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap ps-0">
                    <p className="text-sm">{user?.userId?.full_name}</p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap ps-0">
                    <p className="text-sm">{formatDateTime(user?.updatedAt)}</p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <p className="text-ld">⭐ {user?.rating}</p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <p className="text-sm">{user?.comment}</p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <Button size="xs" onClick={() => handleSendMail(user?.userId?.email)}>
                      Send Mail
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </CardBox>
  );
};

export default Reviews;
