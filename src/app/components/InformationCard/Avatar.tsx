import Image from 'next/image';

interface AvatarProps {
  id: number;
  name: string;
  image: string;
  className?: string;
}

const Avatar = ({ id, name, image, className }: AvatarProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={image}
        alt={name}
        layout='fill'
        objectFit='cover'
        className='rounded-full'
      />
    </div>
  );
};

export default Avatar;
