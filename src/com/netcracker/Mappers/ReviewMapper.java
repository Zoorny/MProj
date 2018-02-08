package com.netcracker.Mappers;

import com.netcracker.Objects.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review> {
    public Review mapRow(ResultSet resultSet, int i) throws SQLException {
        Review review = new Review();
        review.setText(resultSet.getString("REVIEW_TEXT"));
        review.setDate(resultSet.getDate("REVIEW_DATE"));
        review.setUserId(resultSet.getInt("USER_ID"));
        review.setAlbumId(resultSet.getInt("ALBUM_ID"));
        review.setReviewId(resultSet.getInt("REVIEW_ID"));

        return review;
    }
}
