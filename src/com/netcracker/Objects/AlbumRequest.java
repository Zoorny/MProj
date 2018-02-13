package com.netcracker.Objects;

public class AlbumRequest {
    private String[] genres;
    private int minDate;
    private int maxDate;
    private int minRating;
    private int maxRating;
    private String artist;

    public String[] getGenres() {
        return genres;
    }

    public void setGenres(String[] genres) {
        this.genres = genres;
    }


    public int getMinDate() {
        return minDate;
    }

    public void setMinDate(int minDate) {
        this.minDate = minDate;
    }

    public int getMaxDate() {
        return maxDate;
    }

    public void setMaxDate(int maxDate) {
        this.maxDate = maxDate;
    }

    public int getMinRating() {
        return minRating;
    }

    public void setMinRating(int minRating) {
        this.minRating = minRating;
    }

    public int getMaxRating() {
        return maxRating;
    }

    public void setMaxRating(int maxRating) {
        this.maxRating = maxRating;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artists) {
        this.artist = artist;
    }

}
