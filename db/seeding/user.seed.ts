import { UserEntity } from 'src/api/users/entities/user.entity';
import { Repository } from 'typeorm';

export async function seedUsers(userRepository: Repository<UserEntity>) {
  const users = [
    {
      first_name: 'Kassim ',
      last_name: 'Abdulrahman',
      email: 'abdulrahman.kassim@ibileholdings.com ',
    },
    {
      first_name: 'Abike',
      last_name: 'Oluwasanmi',
      email: 'abike.oluwasanmi@ibileholdings.com',
    },
    {
      first_name: 'Abiodun',
      last_name: 'Alabadan',
      email: 'abiodun.alabadan@ibileholdings.com',
    },
    {
      first_name: 'Adijat',
      last_name: 'Akindele',
      email: 'adijat.akindele@ibileholdings.com',
    },
    {
      first_name: 'West',
      last_name: 'Ajemina',
      email: 'ajemina.west@ibileholdings.com',
    },
    {
      first_name: 'Akintunde',
      last_name: 'Odeyemi',
      email: 'akintunde.odeyemi@ibileholdings.com',
    },
    {
      first_name: 'Ayobami',
      last_name: 'Lawal',
      email: 'ayobami.lawal@ibileholdings.com',
    },
    {
      first_name: 'Chisom',
      last_name: 'Okafor',
      email: 'chisom.okafor@ibileholdings.com',
    },
  ];

  await userRepository.save(users);

  console.log('Users seeded successfully');
}
