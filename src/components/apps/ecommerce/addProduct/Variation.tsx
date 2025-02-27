import { useState } from 'react';
import { Label, Radio, TextInput, Card } from 'flowbite-react';
import React from 'react';

const ActivityDetails = ({ eventData, setEventData }: any) => {
  const handleRadioChange = (event: { target: { value: string } }) => {
    setEventData({ ...eventData, type: event.target.value });
  };

  const handleInputChange = (event: { target: { name: string; value: any } }) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  return (
    <Card className="p-6 shadow-md">
      <h5 className="text-lg font-semibold mb-4">Date & Time</h5>

      <div className="mb-4">
        <Label htmlFor="type" value="Activity Type" className="font-medium" />
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="border p-4 rounded-lg hover:border-primary hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-3">
              <Radio
                id="single-activity"
                name="type"
                value="Single"
                checked={eventData.type === 'Single'}
                onChange={handleRadioChange}
              />
              <Label htmlFor="single-activity" className="cursor-pointer text-sm font-semibold">
                Single Activity
              </Label>
            </div>
          </div>
          <div className="border p-4 rounded-lg hover:border-primary hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-3">
              <Radio
                id="recurring-activity"
                name="type"
                value="Recurring"
                checked={eventData.type === 'Recurring'}
                onChange={handleRadioChange}
              />
              <Label htmlFor="recurring-activity" className="cursor-pointer text-sm font-semibold">
                Recurring Activity
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="startDate" value="Start Date" className="font-medium" />
        <TextInput
          id="startDate"
          type="date"
          name="startDate"
          value={eventData.startDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="startTime" value="Start Time" className="font-medium" />
          <TextInput
            id="startTime"
            type="time"
            name="startTime"
            value={eventData.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="endTime" value="End Time" className="font-medium" />
          <TextInput
            id="endTime"
            type="time"
            name="endTime"
            value={eventData.endTime}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default ActivityDetails;
