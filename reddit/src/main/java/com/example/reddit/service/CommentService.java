package com.example.reddit.service;

import com.example.reddit.dto.CommentsDto;
import com.example.reddit.mapper.CommentMapper;
import com.example.reddit.model.Comment;
import com.example.reddit.model.NotificationEmail;
import com.example.reddit.model.Post;
import com.example.reddit.model.User;
import com.example.reddit.repository.CommentRepository;
import com.example.reddit.repository.PostRepository;
import com.example.reddit.repository.UserRepository;
import com.example.reddit.util.CustomException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class CommentService {

    //TODO: Construct POST URL
    private static final String POST_URL = "";

    private final CommentMapper commentMapper;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public void createComment(CommentsDto commentsDto) {
        Post post = postRepository.findById(commentsDto.getPostId())
                .orElseThrow(() -> new CustomException(commentsDto.getPostId().toString()));
        Comment comment = commentMapper.map(commentsDto, post, authService.getCurrentUser());
        commentRepository.save(comment);

        String message = mailContentBuilder.build(post.getUser().getUsername() + " posted a comment on your post." + POST_URL);
        sendCommentNotification(message, post.getUser());
    }

    public List<CommentsDto> getCommentByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(postId.toString()));
        return commentRepository.findByPost(post)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(toList());
    }

    public List<CommentsDto> getCommentsByUser(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepository.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(toList());
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(new NotificationEmail(user.getUsername() + " Commented on your post", user.getEmail(), message));
    }
}
