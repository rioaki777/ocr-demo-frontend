'use client';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import Button from './components/atoms/Button';
import Input from './components/atoms/Input';
import Label from './components/atoms/Label';
import Spinner from './components/atoms/Spinner';
import { useGetOcrJob, useUpdateOcrJob } from './service/ocr';

export default function Home() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [jobId, setJobId] = useState<number>(-1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(false);
  const [ocrImageUrl, setOcrImageUrl] = useState('');
  const mutateOcrJob = useUpdateOcrJob();

  const { data, error, isError } = useGetOcrJob(jobId, isPollingEnabled);
  useEffect(() => {
    setIsPollingEnabled(false);
  }, [isError]);
  useEffect(() => {
    if (!data) return;

    if (data.status !== 'INPROGRESS') {
      setIsPollingEnabled(false);
    }
    if (data.status === 'OK') {
      setOcrImageUrl('http://localhost:8080/ocr/image/' + data.fileName);
    }
  }, [data]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (!files || files?.length === 0 || !files[0]) return;

    const file = files[0];
    if (file) setImageFile(file);
  };

  const handleBack = async () => {
    setIsPollingEnabled(false);
    setShowResult(false);
    setOcrImageUrl('');
    setImageFile(null);
  };

  type OcrJob = {
    id: number;
    fileName: string;
    status: string;
    startDate: string;
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert('画像ファイルを選択してください');
      return;
    }

    setShowResult(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    mutateOcrJob.mutate(formData, {
      onSuccess: (response: AxiosResponse<OcrJob, null>) => {
        setJobId(response.data.id);
        setOcrImageUrl('');
        setIsPollingEnabled(true);
      },
      onError: () => {
        alert('アップロードに失敗しました。');
      },
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start w-1/2 h-full">
        <h1 className="text-3xl font-extrabold">Ocr Demo</h1>
        <hr className="w-full mb-8" />

        <div className="flex flex-col justify-center w-full">
          {!showResult ? (
            <div className="text-center">
              <Label htmlFor="image-name">画像</Label>
              <Input
                id="image-name"
                type="file"
                className="cursor-pointer file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:px-3 file:py-[0.32rem]"
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="text-center mt-9">
                <Button
                  size="lg"
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                  disabled={!imageFile}
                >
                  ファイル選択
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-extrabold mb-5">Ocr結果</h2>
              {isPollingEnabled && (
                <div className="flex items-center justify-center">
                  <Spinner size="lg" />
                </div>
              )}
              {error && <span>Error: {error.message}</span>}
              {data && (
                <div className="w-full">
                  <div className="flex items-center justify-center w-full">
                    <img
                      className="border rounded-lg shadow-md"
                      src={ocrImageUrl}
                      alt=""
                    />
                  </div>
                </div>
              )}

              <div className="text-right mt-9">
                <Button
                  size="sm"
                  color="tertiary"
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
