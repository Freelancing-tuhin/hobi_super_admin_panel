import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BankDetails from 'src/components/apps/userprofile/profile/BankDetails';
import DocumentUploadStepper from 'src/components/apps/userprofile/profile/Documents';
import FirmDetails from 'src/components/apps/userprofile/profile/FirmDetails';
import Introduction from 'src/components/apps/userprofile/profile/Introduction';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { getOrganizerById } from 'src/service/getOrganizers';

const ProfilePage = () => {
  const BCrumb = [{ to: '/', title: 'Organizer Details' }, { title: 'Organizer Details' }];
  const { id } = useParams(); // Get the :id from URL

  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        setLoading(true);
        const data = await getOrganizerById(id);
        setOrganizer(data.result); // Assuming the API response has a 'result' field
      } catch (err) {
        // setError('Failed to fetch organizer details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrganizer();
    }
  }, [id]);

  if (loading) return <p>Loading organizer details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <BreadcrumbComp title="Organizer Details" items={BCrumb} />
      <CardBox>
        <div className="overflow-x-auto  rounded-md  overflow-x-auto">
          <div className="grid grid-cols-12 gap-[30px]">
            {/* Banner */}
            <div className="col-span-12">
              <ProfileBanner user={organizer} />
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="grid grid-cols-12 gap-[30px]">
                {/* Introduction */}
                <div className="col-span-12">
                  <Introduction user={organizer} />
                </div>
                <div className="col-span-12">
                  <DocumentUploadStepper user={organizer} />
                </div>
                {/* Photos */}
              </div>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <div className="col-span-12">
                <BankDetails user={organizer} />
              </div>
              <div className="col-span-12 mt-8">
                <FirmDetails user={organizer} />
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default ProfilePage;
