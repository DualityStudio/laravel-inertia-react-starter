<?php

namespace App\Traits;

use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Mime\MimeTypes;

trait HandlesUpload
{
    /**
     * @param string $tmpPath
     * @param string $visibility
     * @param string $destinationDirectory
     * @param ?string $fileToDelete
     * @return string|string[]
     * @throws Exception
     */
    public function processUpload(
        string $tmpPath,
        string $visibility = 'private',
        string $destinationDirectory = '',
        ?string  $fileToDelete = null
    ): ?string {
        // If the file doesn't exist in the request then do nothing.
        if (!$tmpPath) {
            return null;
        }

        // Ensure the $destinationDirectory does not start with a slash but does end with one.
        if ($destinationDirectory !== '') {
            if (str_starts_with($destinationDirectory, "/") || !str_ends_with($destinationDirectory, "/")) {
                throw new Exception('The destination directory is invalid');
            }
        }

        // Move the file from the "tmp" directory to the $destinationDirectory.
        try {
            Storage::copy(
                $tmpPath,
                $finalKey = str_replace('tmp/', $destinationDirectory, $tmpPath)
            );
        } catch (FileNotFoundException $e) {
            abort(400, 'The upload key was invalid');
        }

        // Delete the previous file.
        if ($fileToDelete && Storage::exists($fileToDelete)) {
            Storage::delete($fileToDelete);
        }

        // Set the file visibility.
        Storage::setVisibility($finalKey, $visibility);

        // Return the final path.
        return $finalKey;
    }

    /**
     * @param string $mime
     * @return string|null
     */
    public function getMimeTypeExtension(string $mime): ?string
    {
        try {
            if (!class_exists(MimeTypes::class)) {
                throw new \Exception(
                    'To enable support for guessing extensions, please install the symfony/mime package.'
                );
            }

            $extension = (new MimeTypes)->getExtensions($mime)[0];

            if (!$extension || $extension === 'bin') {
                return null;
            }

            return $extension;
        } catch (\Exception $e) {
            Log::info("Failed to get $mime: {$e->getMessage()}");
        }
    }
}
