/* eslint-disable @typescript-eslint/no-explicit-any */
// PropertyImages.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Dropzone } from './DropZone';
import Image from 'next/image';

const PropertyImages = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="pictures"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property Images</FormLabel>
          <FormControl>
            <div>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  field.onChange([...field.value, ...acceptedFiles]);
                }}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {field.value?.map((file: File, index: number) => (
                  <Card key={index} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedFiles = field.value.filter((_: File, i: number) => i !== index);
                        field.onChange(updatedFiles);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                    <CardContent className="p-2">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`uploaded-${index}`}
                        className="object-cover w-full h-32 rounded-md"
                        width={300}
                        height={300}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PropertyImages;
