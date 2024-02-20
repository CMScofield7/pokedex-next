import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import IPokemonList from '@/app/interfaces/IPokemonList';
import { fetchPokemonDetails } from '@/app/api/pokeApi';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function PokemonCard({ name, url }: IPokemonList) {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      try {
        const response = await fetchPokemonDetails(url);
        setPokemon(response);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      }
    };
    fetchDetails();
  }, [url]);

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="flex justify-center">
      <Card className={`w-full border ${pokemon?.types[0].type.name}`}>
        <CardHeader className="gap-1">
          <CardTitle>{capitalizedName}</CardTitle>
          <CardDescription className="text-white">
            {pokemon?.id}
          </CardDescription>
          <div className="flex flex-row justify-center">
            <Badge
              className={`mr-2 w-16 h-7" variant="secondary" border border-white ${pokemon?.types[0].type.name}`}
            >
              <p>
                {pokemon?.types[0].type.name.charAt(0).toUpperCase() +
                  pokemon?.types[0].type.name.slice(1)}
              </p>
            </Badge>
            {pokemon?.types.length > 1 && (
              <Badge
                className={`mr-2 w-16 h-7" variant="secondary" border border-white ${pokemon?.types[1].type.name}`}
              >
                {pokemon?.types[1].type.name.charAt(0).toUpperCase() +
                  pokemon?.types[1].type.name.slice(1)}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Image
            src={
              pokemon?.sprites.versions['generation-vii'][
                'ultra-sun-ultra-moon'
              ].front_default
            }
            width={150}
            height={150}
            alt={name}
            priority
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
