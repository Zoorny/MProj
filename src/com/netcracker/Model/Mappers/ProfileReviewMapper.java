package com.netcracker.Model.Mappers;

import com.netcracker.Model.Objects.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProfileReviewMapper implements RowMapper<Review> {
    public Review mapRow(ResultSet resultSet, int i) throws SQLException {
        Review review = new Review();
        review.setText(resultSet.getString("REVIEW_TEXT"));
        review.setDate(resultSet.getDate("REVIEW_DATE"));
        review.setUserId(resultSet.getInt("USER_ID"));
        review.setAlbumId(resultSet.getInt("ALBUM_ID"));
        review.setReviewId(resultSet.getInt("REVIEW_ID"));
        review.setRating(resultSet.getString("REVIEW_RATING"));
        review.setAlbumName(resultSet.getString("ALBUM_TITLE"));
        review.setArtistName(resultSet.getString("ARTIST_NAME"));

        return review;
    }
}
