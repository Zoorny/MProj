package com.netcracker.Model.Objects;

public class Preferences {
    private String genre;
    private int rating;

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Preferences{" +
                "genre='" + genre + '\'' +
                ", rating=" + rating +
                '}';
    }
}
