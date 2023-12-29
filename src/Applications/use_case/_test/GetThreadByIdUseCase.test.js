const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeUnlikeRepository = require('../../../Domains/likes/LikeRepository');
const GetThreadUseCase = require('../GetThreadByIdUseCase');

describe('GetThreadUseCase', () => {
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const expectedThread = {
      id: 'thread-123',
      title: 'ini adalah judul thread',
      body: 'ini adalah isi thread',
      date: '2022',
      username: 'dicoding',
    };

    const expectedComments = [
      {
        id: 'comment-123',
        thread_id: 'thread-123',
        owner: 'user-123',
        content: 'ini adalah isi komentar',
        date: '2022',
        is_deleted: false,
        username: 'dicoding',
      },
    ];

    const expectedReplies = [
      {
        id: 'reply-123',
        comment_id: 'comment-123',
        owner: 'user-123',
        content: 'ini adalah isi balasan',
        date: '2022',
        is_deleted: false,
        username: 'jhon',
      },
    ];

    const expectedLikeCount = [
      {
        comment_id: 'comment-123',
      },
      {
        comment_id: 'comment-123',
      },
    ];

    const expectedCommentsAndReplies = expectedComments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      content: comment.content,
      likeCount: expectedLikeCount.length,
      replies: expectedReplies.map((reply) => ({
        id: reply.id,
        content: reply.content,
        date: reply.date,
        username: reply.username,
      })),
    }));

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeUnlikeRepository = new LikeUnlikeRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComments));
    mockThreadRepository.getRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedReplies));
    mockLikeUnlikeRepository.getLikeCountComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedLikeCount));

    const mockGetThreadUseCase = new GetThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeUnlikeRepository,
    });

    // Action
    const theThread = await mockGetThreadUseCase.execute(useCasePayload.threadId);

    // Assert
    expect(theThread).toStrictEqual({
      ...expectedThread,
      comments: expectedCommentsAndReplies,
    });
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.getRepliesByThreadId).toBeCalledWith(useCasePayload.threadId);
    expect(mockLikeUnlikeRepository.getLikeCountComment).toBeCalledWith(useCasePayload.threadId);
  });

  it('should not display deleted comment', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const expectedThread = {
      id: 'thread-123',
      title: 'ini adalah judul thread',
      body: 'ini adalah isi thread',
      date: '2022',
      username: 'dicoding',
    };

    const expectedComments = [
      {
        id: 'comment-123',
        thread_id: 'thread-123',
        owner: 'user-123',
        content: 'ini adalah isi komentar',
        date: '2022',
        is_deleted: true,
        username: 'dicoding',
      },
    ];

    const expectedReplies = [
      {
        id: 'reply-123',
        comment_id: 'comment-123',
        owner: 'user-123',
        content: 'ini adalah isi balasan',
        date: '2022',
        is_deleted: true,
        username: 'jhon',
      },
    ];

    const expectedLikeCount = [
      {
        comment_id: 'comment-123',
      },
      {
        comment_id: 'comment-123',
      },
    ];

    const expectedCommentsAndReplies = expectedComments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      content: '**komentar telah dihapus**',
      likeCount: expectedLikeCount.length,
      replies: expectedReplies.map((reply) => ({
        id: reply.id,
        content: '**balasan telah dihapus**',
        date: reply.date,
        username: reply.username,
      })),
    }));

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeUnlikeRepository = new LikeUnlikeRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComments));
    mockThreadRepository.getRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedReplies));
    mockLikeUnlikeRepository.getLikeCountComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedLikeCount));

    const mockGetThreadUseCase = new GetThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeUnlikeRepository,
    });

    // Action
    const theThread = await mockGetThreadUseCase.execute(useCasePayload.threadId);

    // Assert
    expect(theThread).toStrictEqual({
      ...expectedThread,
      comments: expectedCommentsAndReplies,
    });
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.getRepliesByThreadId).toBeCalledWith(useCasePayload.threadId);
    expect(mockLikeUnlikeRepository.getLikeCountComment).toBeCalledWith(useCasePayload.threadId);
  });
});
