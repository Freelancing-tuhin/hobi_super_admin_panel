import { Icon } from '@iconify/react/dist/iconify.js';

const DownloadCv = ({ data }: any) => {
  const downloadCSV = () => {
    if (!data || data.length === 0) {
      console.error('No data available to download');
      return;
    }

    // Define CSV headers (excluding sensitive fields)
    const headers = [
      'Full Name',
      'Age',
      'Phone',
      'Email',
      'Address',
      'Is Verified',
      'PAN',
      'GST',
      'Bank Account',
    ];

    // Map data to CSV format
    const csvRows = [
      headers.join(','), // Add headers
      ...data.map((item: any) =>
        [
          item.full_name,
          item.age,
          item.phone,
          item.email,
          item.address,
          item.is_verified ? 'Yes' : 'No',
          item.PAN || 'N/A',
          item.GST || 'N/A',
          item.bank_account || 'N/A',
        ].join(','),
      ),
    ];

    // Convert array to CSV string
    const csvString = csvRows.join('\n');

    // Create a blob and trigger download
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="">
      {/* Download Button */}
      <button
        onClick={downloadCSV}
        className=" px-8 flex gap-2 items-center py-2.5 bg-green-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <Icon icon="solar:file-download-bold-duotone" height="18" />
        Download
      </button>
    </div>
  );
};

export default DownloadCv;
