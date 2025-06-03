import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { addPropertySchema } from "@/lib/add-property-schema";

const amenitiesOptions = [
  "Air Conditioning",
  "Lundry",
  "Balcony",
  "Garden",
  "Swimming Pool",
  "Gym",
  "Parking",
];



type AddPropertyFormValues = z.infer<typeof addPropertySchema>;


const PropertyDetails = ({ form }: { form: UseFormReturn<AddPropertyFormValues> }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-2">
      <FormField
        control={form.control}
        name="rooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many bedrooms?</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1-horizontal" />
                <Label htmlFor="r1-horizontal">One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="r2-horizontal" />
                <Label htmlFor="r2-horizontal">Two</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r3-horizontal" />
                <Label htmlFor="r3-horizontal">Three</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="r4-horizontal" />
                <Label htmlFor="r4-horizontal">Four</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r5-horizontal" />
                <Label htmlFor="r5-horizontal">Five</Label>
              </div>
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many bathrooms?</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="b1-horizontal" />
                <Label htmlFor="b1-horizontal">One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="b2-horizontal" />
                <Label htmlFor="b2-horizontal">Two</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="b3-horizontal" />
                <Label htmlFor="b3-horizontal">Three</Label>
              </div>
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="kitchen"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many kitchens?</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="k1-horizontal" />
                <Label htmlFor="k1-horizontal">One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="k2-horizontal" />
                <Label htmlFor="k2-horizontal">Two</Label>
              </div>
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rent</FormLabel>
            <FormControl>
              <Input placeholder="Enter the amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="agency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agency Fee</FormLabel>
            <FormControl>
              <Input placeholder="Enter the amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="legal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Legal Fee</FormLabel>
            <FormControl>
              <Input placeholder="Enter the amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="caution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Caution Fee</FormLabel>
            <FormControl>
              <Input placeholder="Enter the amount" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amenities"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Amenities</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {field.value?.length > 0
                    ? `${field.value.length} selected`
                    : "Select amenities"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search amenities..." />
                  <CommandList>
                    <CommandEmpty>No amenities found.</CommandEmpty>
                    <CommandGroup>
                      {amenitiesOptions.map((option) => (
                        <CommandItem
                          key={option}
                          onSelect={() => {
                            const isSelected = (field.value as typeof amenitiesOptions[number][])?.includes(option);
                            if (isSelected) {
                              field.onChange(
                                (field.value as typeof amenitiesOptions[number][]).filter(
                                  (item) => item !== option
                                )
                              );
                            } else {
                              field.onChange([...(field.value || []), option]);
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                (field.value as typeof amenitiesOptions[number][])?.includes(option)
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {option}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* Selected tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {field.value?.map((item: string) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyDetails;
