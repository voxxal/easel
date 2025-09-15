for file in image*x1.png
    # Extract the first number from the filename
    set number (string match -r '\d+' $file)[1]

    # Convert to zero-based index (subtract 1)
    set index (math $number - 1)

    # Create the new filename
    set newname "digit-$index.png"

    # Rename the file
    mv $file $newname
    echo "Renamed $file to $newname"
end
