import { Comment } from './comment.schema';

export const DUMMY_COMMENT: Comment = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  body: '안녕하세요? 댓글입니다',
  author: {
    username: 'user1',
    bio: 'user1의 소개글입니다',
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: false,
  },
};
