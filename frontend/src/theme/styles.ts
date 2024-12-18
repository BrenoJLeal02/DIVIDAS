import { mode } from '@chakra-ui/theme-tools';
export const globalStyles = {
	colors: {
		brand: {
			100: "#E3F9E9",
			200: "#2ABF42",
			300: "#2ABF42",
			400: "#FFE518",
			500: "#2ABF42",
			600: "#1DBB33",
			700: "#004A02",
			800: "#097319",
			900: "#074811"
		},
		brandScheme: {
			100: "#E9F8E0", 
			200: "#B9D8A6",  
			300: "#9ACF7E",  
			400: "#6DAB4E",  
			500: "#2C9A4F",  
			600: "#1E7A3E",  
			700: "#0F5B2D",  
			800: "#074C1F",  
			900: "#042C12"   
		},
		brandTabs: {
			100: "#E9F8E0", 
			200: "#6DAB4E",
			300: "#6DAB4E", 
			400: "#6DAB4E",  // Medium Green
			500: "#2C9A4F",  // Primary Green
			600: "#1E7A3E",  // Darker Green
			700: "#0F5B2D",  // Even Darker Green
			800: "#074C1F",  // Very Dark Green
			900: "#042C12"   // Almost Black Green
		},
		secondaryGray: {
			100: '#E0E5F2',
			200: '#E1E9F8',
			300: '#F4F7FE',
			400: '#E9EDF7',
			500: '#8F9BBA',
			600: '#A3AED0',
			700: '#707EAE',
			800: '#707EAE',
			900: '#1B2559'
		},
		red: {
			100: '#FEEFEE',
			500: '#EE5D50',
			600: '#E31A1A'
		},
		blue: {
			50: '#EFF4FB',
			500: '#3965FF'
		},
		orange: {
			100: '#FFF6DA',
			500: '#FFB547'
		},
		green: {
			100: '#E6FAF5',
			500: '#01B574'
		},
		navy: {
			50: "#d0d0d0",
			100: "#a8a8a8",
			200: "#9e9e9e",
			300: "#737373",
			400: "#4d4d4d",
			500: "#1e1e1e",
			600: "#2b2b2b",
			700: "#1f1f1f",
			800: "#1a1a1a",
			900: "#0d0d0d"
		},
		gray: {
			100: '#FAFCFE'
		}
	},
	styles: {
		global: (props: never) => ({
			body: {
				overflowX: 'hidden',
				bg: mode('white', 'navy.900')(props),
				letterSpacing: '-0.5px'
			},
			input: {
				color: 'gray.700'
			},
			html: {
				fontFamily: 'DM Sans'
			}
		})
	}
};
