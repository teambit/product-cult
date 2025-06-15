import { prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

export class UserProfileModel {
  @prop({ unique: true, required: true, type: String })
  public userId: string;

  @prop({ required: true, type: String })
  public name: string;

  @prop({ type: String })
  public imageUrl?: string;

  @prop({ required: true, type: String })
  public bio: string;

  @prop({ type: String })
  public company?: string;

  @prop({ type: String })
  public email?: string;

  @prop({ type: String })
  public location?: string;

  @prop({ type: Object })
  public socialMediaLinks?: Record<string, string>;

  @prop({ required: true, type: Date })
  public createdAt: Date;

  @prop({ type: Date })
  public updatedAt?: Date;
}

export const userProfileModelMock = [
  {
    userId: '1',
    name: 'Alice Smith',
    imageUrl: 'https://images.unsplash.com/photo-1583312605516-4d11f1acbdd0?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHl8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDc1NXww&ixlib=rb-4.1.0&q=80&w=200',
    bio: 'Passionate about community building and open-source projects.',
    company: 'Community Co.',
    email: 'alice.s@example.com',
    location: 'New York, USA',
    socialMediaLinks: {
      twitter: 'https://twitter.com/alicesmith',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '2',
    name: 'Bob Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1604092037830-99a284b5ee25?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxjb21tdW5pdHl8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDc1NXww&ixlib=rb-4.1.0&q=80&w=200',
    bio: 'Tech enthusiast and product manager. Always seeking new challenges.',
    company: 'Innovate Corp',
    email: 'bob.j@example.com',
    location: 'San Francisco, USA',
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/bobjohnson',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '3',
    name: 'Charlie Brown',
    imageUrl: 'https://images.unsplash.com/photo-1528475241046-df4c983f31e9?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxjb21tdW5pdHl8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDc1NXww&ixlib=rb-4.1.0&q=80&w=200',
    bio: 'UX/UI Designer with a focus on user-centered design.',
    company: 'Design First',
    email: 'charlie.b@example.com',
    location: 'London, UK',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '4',
    name: 'Diana Prince',
    imageUrl: 'https://images.unsplash.com/photo-1615215271299-608ada121f72?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxjb21tdW5pdHl8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDc1NXww&ixlib=rb-4.1.0&q=80&w=200',
    bio: 'Software engineer specializing in backend systems and data architecture.',
    company: 'Code Wizards',
    email: 'diana.p@example.com',
    location: 'Berlin, Germany',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '5',
    name: 'Ethan Hunt',
    imageUrl: 'https://images.unsplash.com/photo-1606708820758-7a0781e1d700?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxjb21tdW5pdHl8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDc1NXww&ixlib=rb-4.1.0&q=80&w=200',
    bio: 'Marketing professional with expertise in digital strategy.',
    company: 'Growth Gurus',
    email: 'ethan.h@example.com',
    location: 'Sydney, Australia',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '6',
    name: 'Elon Musk',
    imageUrl: 'https://images.unsplash.com/photo-1615215271299-608ada121f72?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxjb21tdW5pdHl8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDc1NXww&ixlib=rb-4.1.0&q=80&w=200',
    bio: 'Sends rockets to space, cars into orbit, and memes into your feed. Thinks the letter X is chronically underused..',
    company: 'SpaceX',
    email: 'elon.m@example.com',
    location: 'New York, USA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '7',
    name: 'Chris Messina',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrBXKpLTmRgZgS4Zoy8HObuLdMKrH8fCSUQ&s',
    bio: 'Product Cult #1 Hunter.',
    company: 'Chris Messina',
    email: 'chris.mb@example.com',
    location: 'London, UK',
    socialMediaLinks: {
     website : 'https://www.producthunt.com/@chrismessina',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: '8',
    name: 'Ran Mizrahi',
    imageUrl: 'https://bitsrc.imgix.net/7514176f43a160682f7f0d32ba6b260ca36c94da.jpeg?size=32&w=64&h=64&crop=faces&fit=crop&bg=ededed',
    bio: 'On a mission to change how software is built, one component at a time. Now focused on the AI-powered future of composition. Thinks in components, dreams in architecture.',
    company: 'Bit Cloud',
    email: 'ran@example.com',
    location: 'London, UK',
    socialMediaLinks: {
     website : 'https://www.x.com/@ranm8',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
