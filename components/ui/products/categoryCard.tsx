"use client"

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";


export default function categoryCard({
  category,
  onClickCustom,
} : {
  category: { id: string; name: string };
  onClickCustom: () => void;
}){
    return (
      <Card shadow="sm" key={category.id} isPressable onPress={onClickCustom}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt="Category Image"
              className="w-full object-cover h-[140px]"
              src="https://hips.hearstapps.com/hmg-prod/images/ice-tea-royalty-free-image-1621872849.jpg?resize=980:*"
            />
          </CardBody>
          <CardFooter className="text-small justify-center">
            <b>{category.name}</b>
          </CardFooter>
        </Card>
    )
}