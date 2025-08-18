import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';

async function collectCoverageFiles() {
	try {
		// Define the patterns to search
		const patterns = ['../../apps/*', '../../packages/*'];

		// Define the destination directory (you can change this as needed)
		const destinationDir = path.join(process.cwd(), 'coverage/raw');

		// Create the destination directory if it doesn't exist
		await fs.mkdir(destinationDir, {
			recursive: true,
		});

		// Arrays to collect all directories and directories with coverage.json
		const allDirectories: string[] = [];
		const directoriesWithCoverage: string[] = [];

		// Process each pattern using Promise.all for better performance
		const allMatches = await Promise.all(
			patterns.map((pattern) => glob(pattern))
		);

		// Flatten all matches
		const flatMatches = allMatches.flat();

		// Filter directories and check for coverage files in parallel
		const directoryChecks = await Promise.all(
			flatMatches.map(async (match) => {
				try {
					const stats = await fs.stat(match);
					if (!stats.isDirectory()) return null;

					allDirectories.push(match);
					const coverageFilePath = path.join(match, 'coverage.json');

					try {
						await fs.access(coverageFilePath);

						// File exists, add to list and copy
						const directoryName = path.basename(match);
						const destinationFile = path.join(
							destinationDir,
							`${directoryName}.json`
						);

						await fs.copyFile(coverageFilePath, destinationFile);
						return match; // Return match if coverage file exists
					} catch {
						// File doesn't exist in this directory, skip
						return null;
					}
				} catch {
					// Error accessing directory, skip
					return null;
				}
			})
		);

		// Filter out null values to get directories with coverage
		const validDirectories = directoryChecks.filter(
			(dir): dir is string => dir !== null
		);
		directoriesWithCoverage.push(...validDirectories);

		// Create clean patterns for display (without any "../" prefixes)
		const replaceDotPatterns = (str: string) => str.replace(/\.\.\//g, '');

		if (directoriesWithCoverage.length > 0) {
			// Use process.stdout.write instead of console.log for scripts
			process.stdout.write(
				`Found coverage.json in: ${directoriesWithCoverage
					.map(replaceDotPatterns)
					.join(', ')}\n`
			);
		}

		process.stdout.write(
			`Coverage collected into: ${path.join(process.cwd())}\n`
		);
	} catch (error) {
		// console.error is acceptable for error reporting in scripts
		process.stderr.write(`Error collecting coverage files: ${error}\n`);
		process.exit(1);
	}
}

// Run the function and handle promise properly
void collectCoverageFiles();
